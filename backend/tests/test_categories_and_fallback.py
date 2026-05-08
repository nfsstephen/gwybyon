"""
Test Categories API and Fallback Pricing
Tests:
1. GET /api/contracts/categories - returns joined data from category + category_business_mapping tables
2. POST /api/contracts/territory-pricing with category_type - fallback pricing from category_business_mapping

Supabase data:
- category table: 12 rows (4 categories x 3 types: small, medium, large)
- category_business_mapping: 12 rows with base prices
  - Plumber: small=200, medium=450, large=900
  - Pest Control Service: small=180, medium=400, large=850
  - Well & Septic Co.: small=250, medium=500, large=1000
  - Electricians: small=220, medium=480, large=950
- territory_pricings: 3 overrides
  - Union/Plumber/Small=$255
  - Jackson/Electrician/Medium=$500
  - Alachua/Mechanic/Large=$12000
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestCategoriesEndpoint:
    """Tests for GET /api/contracts/categories endpoint"""
    
    def test_categories_endpoint_returns_200(self):
        """Categories endpoint should return 200"""
        response = requests.get(f"{BASE_URL}/api/contracts/categories")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    
    def test_categories_returns_categories_list(self):
        """Response should contain 'categories' key with list"""
        response = requests.get(f"{BASE_URL}/api/contracts/categories")
        assert response.status_code == 200
        data = response.json()
        assert "categories" in data, "Response should contain 'categories' key"
        assert isinstance(data["categories"], list), "Categories should be a list"
    
    def test_categories_contains_expected_industries(self):
        """Should return 4 categories: Plumber, Pest Control Service, Well & Septic Co., Electricians"""
        response = requests.get(f"{BASE_URL}/api/contracts/categories")
        assert response.status_code == 200
        data = response.json()
        category_names = [cat["name"] for cat in data["categories"]]
        
        expected_categories = ["Plumber", "Pest Control Service", "Well & Septic Co.", "Electricians"]
        for expected in expected_categories:
            assert expected in category_names, f"Expected category '{expected}' not found in {category_names}"
    
    def test_categories_have_types_with_pricing(self):
        """Each category should have types array with pricing info"""
        response = requests.get(f"{BASE_URL}/api/contracts/categories")
        assert response.status_code == 200
        data = response.json()
        
        for cat in data["categories"]:
            assert "name" in cat, "Category should have 'name'"
            assert "types" in cat, f"Category {cat['name']} should have 'types'"
            assert isinstance(cat["types"], list), f"Types for {cat['name']} should be a list"
            assert len(cat["types"]) > 0, f"Category {cat['name']} should have at least one type"
            
            for type_info in cat["types"]:
                assert "type" in type_info, f"Type info should have 'type' field"
                assert "price" in type_info, f"Type info should have 'price' field"
    
    def test_plumber_pricing_structure(self):
        """Plumber should have small=200, medium=450, large=900"""
        response = requests.get(f"{BASE_URL}/api/contracts/categories")
        assert response.status_code == 200
        data = response.json()
        
        plumber = next((cat for cat in data["categories"] if cat["name"] == "Plumber"), None)
        assert plumber is not None, "Plumber category not found"
        
        type_prices = {t["type"]: t["price"] for t in plumber["types"]}
        assert type_prices.get("small") == 200, f"Plumber small should be 200, got {type_prices.get('small')}"
        assert type_prices.get("medium") == 450, f"Plumber medium should be 450, got {type_prices.get('medium')}"
        assert type_prices.get("large") == 900, f"Plumber large should be 900, got {type_prices.get('large')}"
    
    def test_electricians_pricing_structure(self):
        """Electricians should have small=220, medium=480, large=950"""
        response = requests.get(f"{BASE_URL}/api/contracts/categories")
        assert response.status_code == 200
        data = response.json()
        
        electricians = next((cat for cat in data["categories"] if cat["name"] == "Electricians"), None)
        assert electricians is not None, "Electricians category not found"
        
        type_prices = {t["type"]: t["price"] for t in electricians["types"]}
        assert type_prices.get("small") == 220, f"Electricians small should be 220, got {type_prices.get('small')}"
        assert type_prices.get("medium") == 480, f"Electricians medium should be 480, got {type_prices.get('medium')}"
        assert type_prices.get("large") == 950, f"Electricians large should be 950, got {type_prices.get('large')}"


class TestTerritoryPricingWithFallback:
    """Tests for POST /api/contracts/territory-pricing with category_type fallback"""
    
    def test_jackson_electricians_medium_returns_territory_price(self):
        """Jackson/Electricians with medium type should return territory-specific $500 (not fallback)"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Jackson"],
                "category": "Electricians",
                "category_type": "medium",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # Jackson has territory-specific price of $500 for Electricians
        assert data["prices"].get("Jackson") == 500, f"Expected Jackson price to be 500 (territory-specific), got {data['prices'].get('Jackson')}"
    
    def test_electricians_small_fallback_returns_220(self):
        """Electricians with small type should return $220 fallback for counties without territory pricing"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Electricians",
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # These counties don't have territory-specific pricing, should use fallback
        assert data["prices"].get("Miami-Dade") == 220, f"Expected Miami-Dade price to be 220 (fallback), got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 220, f"Expected Broward price to be 220 (fallback), got {data['prices'].get('Broward')}"
        assert data.get("fallback_price") == 220, f"Expected fallback_price to be 220, got {data.get('fallback_price')}"
    
    def test_plumber_medium_union_returns_territory_price(self):
        """Union/Plumber with medium type should return territory-specific $255 (not fallback $450)"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Union"],
                "category": "Plumber",
                "category_type": "medium",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # Union has territory-specific price of $255 for Plumber
        assert data["prices"].get("Union") == 255, f"Expected Union price to be 255 (territory-specific), got {data['prices'].get('Union')}"
    
    def test_plumber_medium_other_counties_returns_fallback(self):
        """Plumber with medium type for other counties should return $450 fallback"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Plumber",
                "category_type": "medium",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # These counties don't have territory-specific pricing, should use fallback
        assert data["prices"].get("Miami-Dade") == 450, f"Expected Miami-Dade price to be 450 (fallback), got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 450, f"Expected Broward price to be 450 (fallback), got {data['prices'].get('Broward')}"
        assert data.get("fallback_price") == 450, f"Expected fallback_price to be 450, got {data.get('fallback_price')}"
    
    def test_mixed_territory_and_fallback_pricing(self):
        """Test mix of territory-specific and fallback pricing"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Union", "Miami-Dade", "Broward"],
                "category": "Plumber",
                "category_type": "medium",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # Union has territory-specific $255, others should get fallback $450
        assert data["prices"].get("Union") == 255, f"Expected Union price to be 255 (territory-specific), got {data['prices'].get('Union')}"
        assert data["prices"].get("Miami-Dade") == 450, f"Expected Miami-Dade price to be 450 (fallback), got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 450, f"Expected Broward price to be 450 (fallback), got {data['prices'].get('Broward')}"
    
    def test_without_category_type_no_fallback(self):
        """Without category_type, counties without territory pricing should return null"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "Electricians",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # Without category_type, no fallback should be applied
        assert data["prices"].get("Miami-Dade") is None, f"Expected Miami-Dade price to be None without category_type, got {data['prices'].get('Miami-Dade')}"
        assert data.get("fallback_price") is None, f"Expected fallback_price to be None, got {data.get('fallback_price')}"
    
    def test_pest_control_small_fallback(self):
        """Pest Control Service with small type should return $180 fallback"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "Pest Control Service",
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data["prices"].get("Miami-Dade") == 180, f"Expected Miami-Dade price to be 180 (fallback), got {data['prices'].get('Miami-Dade')}"
        assert data.get("fallback_price") == 180, f"Expected fallback_price to be 180, got {data.get('fallback_price')}"
    
    def test_well_septic_large_fallback(self):
        """Well & Septic Co. with large type should return $1000 fallback"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "Well & Septic Co.",
                "category_type": "large",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data["prices"].get("Miami-Dade") == 1000, f"Expected Miami-Dade price to be 1000 (fallback), got {data['prices'].get('Miami-Dade')}"
        assert data.get("fallback_price") == 1000, f"Expected fallback_price to be 1000, got {data.get('fallback_price')}"


class TestTierToCategoryTypeMapping:
    """Tests for tier to category_type mapping (small-standard=small, small-premium=medium, large-full=large)"""
    
    def test_small_standard_tier_uses_small_type(self):
        """small-standard tier should use 'small' category_type"""
        # Electricians small = $220
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "Electricians",
                "category_type": "small",  # small-standard maps to small
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["prices"].get("Miami-Dade") == 220, f"Expected $220 for small type, got {data['prices'].get('Miami-Dade')}"
    
    def test_small_premium_tier_uses_medium_type(self):
        """small-premium tier should use 'medium' category_type"""
        # Electricians medium = $480
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "Electricians",
                "category_type": "medium",  # small-premium maps to medium
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["prices"].get("Miami-Dade") == 480, f"Expected $480 for medium type, got {data['prices'].get('Miami-Dade')}"
    
    def test_large_full_tier_uses_large_type(self):
        """large-full tier should use 'large' category_type"""
        # Electricians large = $950
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "Electricians",
                "category_type": "large",  # large-full maps to large
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["prices"].get("Miami-Dade") == 950, f"Expected $950 for large type, got {data['prices'].get('Miami-Dade')}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
