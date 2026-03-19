import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, Date, JSON, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from supabase_db import Base


def gen_uuid():
    return str(uuid.uuid4())


def utc_now():
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = 'users'

    id = Column(String(36), primary_key=True, default=gen_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default='client', index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    business_profiles = relationship('BusinessProfile', back_populates='owner', cascade='all, delete-orphan')


class BusinessProfile(Base):
    __tablename__ = 'business_profiles'

    id = Column(String(36), primary_key=True, default=gen_uuid)
    user_id = Column(String(36), ForeignKey('users.id', ondelete='CASCADE'), index=True)
    business_name = Column(String(255), nullable=False)
    address = Column(Text)
    city = Column(String(100))
    state = Column(String(50))
    zip_code = Column(String(20))
    phone = Column(String(20))
    website = Column(String(255))
    google_place_id = Column(String(255))
    category = Column(String(100))
    local_authority_score = Column(Integer, default=0)
    subscription_tier = Column(Integer, default=1)
    subscription_status = Column(String(20), default='trial')
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    owner = relationship('User', back_populates='business_profiles')
    scan_results = relationship('ScanResult', back_populates='business_profile', cascade='all, delete-orphan')
    action_feed = relationship('ActionFeedItem', back_populates='business_profile', cascade='all, delete-orphan')
    gbp_metrics = relationship('GBPMetric', back_populates='business_profile', cascade='all, delete-orphan')
    content_queue = relationship('ContentQueueItem', back_populates='business_profile', cascade='all, delete-orphan')


class ScanResult(Base):
    __tablename__ = 'scan_results'

    id = Column(String(36), primary_key=True, default=gen_uuid)
    business_profile_id = Column(String(36), ForeignKey('business_profiles.id', ondelete='CASCADE'), index=True)
    scan_date = Column(DateTime(timezone=True), default=utc_now)
    local_authority_score = Column(Integer, default=0)
    grid_data = Column(JSON)
    metrics = Column(JSON)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    business_profile = relationship('BusinessProfile', back_populates='scan_results')


class ActionFeedItem(Base):
    __tablename__ = 'action_feed'

    id = Column(String(36), primary_key=True, default=gen_uuid)
    business_profile_id = Column(String(36), ForeignKey('business_profiles.id', ondelete='CASCADE'), index=True)
    action_type = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    platform = Column(String(50))
    status = Column(String(20), default='completed')
    created_at = Column(DateTime(timezone=True), default=utc_now)

    business_profile = relationship('BusinessProfile', back_populates='action_feed')


class GBPMetric(Base):
    __tablename__ = 'gbp_metrics'

    id = Column(String(36), primary_key=True, default=gen_uuid)
    business_profile_id = Column(String(36), ForeignKey('business_profiles.id', ondelete='CASCADE'), index=True)
    date = Column(Date, nullable=False)
    calls = Column(Integer, default=0)
    directions = Column(Integer, default=0)
    map_views = Column(Integer, default=0)
    website_clicks = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    business_profile = relationship('BusinessProfile', back_populates='gbp_metrics')


class APIUsage(Base):
    __tablename__ = 'api_usage'

    id = Column(String(36), primary_key=True, default=gen_uuid)
    service_name = Column(String(100), nullable=False, index=True)
    credits_used = Column(Float, default=0)
    tokens_consumed = Column(Integer, default=0)
    cost = Column(Numeric(10, 4), default=0)
    date = Column(Date, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)


class ContentQueueItem(Base):
    __tablename__ = 'content_queue'

    id = Column(String(36), primary_key=True, default=gen_uuid)
    business_profile_id = Column(String(36), ForeignKey('business_profiles.id', ondelete='CASCADE'), index=True)
    content_type = Column(String(50), nullable=False)
    title = Column(String(255))
    content_text = Column(Text, nullable=False)
    status = Column(String(20), default='pending', index=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    reviewed_at = Column(DateTime(timezone=True))

    business_profile = relationship('BusinessProfile', back_populates='content_queue')
