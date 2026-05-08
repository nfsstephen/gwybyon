"""
Test Territory Pricing with 804 rows (67 counties × 4 categories × 3 types)
Tests POST /api/contracts/territory-pricing with (county, category, category_type) 3-key lookup

Expected prices from category_business_mapping:
- Plumber: small=$200, medium=$450, large=$900
- Pest Control Service: small=$180, medium=$400, large=$850
- Well & Septic Co.: small=$250, medium=$500, large=$1000
- Electricians: small=$220, medium=$480, large=$950

Frontend tier mapping:
- small-standard → small
- small-premium → medium
- large-full → large
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestElectriciansPricing:
    """Tests for Electricians category pricing across all tiers"""
    
    def test_electricians_small_returns_220_for_all_counties(self):
        """Electricians with category_type=small should return $220 for all counties"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward", "Palm Beach", "Orange", "Hillsborough"],
                "category": "Electricians",
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        for county in ["Miami-Dade", "Broward", "Palm Beach", "Orange", "Hillsborough"]:
            assert data["prices"].get(county) == 220, f"Expected {county} price to be 220, got {data['prices'].get(county)}"
    
    def test_electricians_medium_returns_480(self):
        """Electricians with category_type=medium should return $480"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Electricians",
                "category_type": "medium",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 480, f"Expected Miami-Dade price to be 480, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 480, f"Expected Broward price to be 480, got {data['prices'].get('Broward')}"
    
    def test_electricians_large_returns_950(self):
        """Electricians with category_type=large should return $950"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Electricians",
                "category_type": "large",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 950, f"Expected Miami-Dade price to be 950, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 950, f"Expected Broward price to be 950, got {data['prices'].get('Broward')}"


class TestPlumberPricing:
    """Tests for Plumber category pricing across all tiers"""
    
    def test_plumber_small_returns_200(self):
        """Plumber with category_type=small should return $200"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Plumber",
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 200, f"Expected Miami-Dade price to be 200, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 200, f"Expected Broward price to be 200, got {data['prices'].get('Broward')}"
    
    def test_plumber_medium_returns_450(self):
        """Plumber with category_type=medium should return $450"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Plumber",
                "category_type": "medium",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 450, f"Expected Miami-Dade price to be 450, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 450, f"Expected Broward price to be 450, got {data['prices'].get('Broward')}"
    
    def test_plumber_large_returns_900(self):
        """Plumber with category_type=large should return $900"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Plumber",
                "category_type": "large",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 900, f"Expected Miami-Dade price to be 900, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 900, f"Expected Broward price to be 900, got {data['prices'].get('Broward')}"


class TestPestControlPricing:
    """Tests for Pest Control Service category pricing across all tiers"""
    
    def test_pest_control_small_returns_180(self):
        """Pest Control Service with category_type=small should return $180"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Pest Control Service",
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 180, f"Expected Miami-Dade price to be 180, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 180, f"Expected Broward price to be 180, got {data['prices'].get('Broward')}"
    
    def test_pest_control_medium_returns_400(self):
        """Pest Control Service with category_type=medium should return $400"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Pest Control Service",
                "category_type": "medium",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 400, f"Expected Miami-Dade price to be 400, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 400, f"Expected Broward price to be 400, got {data['prices'].get('Broward')}"
    
    def test_pest_control_large_returns_850(self):
        """Pest Control Service with category_type=large should return $850"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Pest Control Service",
                "category_type": "large",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 850, f"Expected Miami-Dade price to be 850, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 850, f"Expected Broward price to be 850, got {data['prices'].get('Broward')}"


class TestWellSepticPricing:
    """Tests for Well & Septic Co. category pricing across all tiers"""
    
    def test_well_septic_small_returns_250(self):
        """Well & Septic Co. with category_type=small should return $250"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Well & Septic Co.",
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 250, f"Expected Miami-Dade price to be 250, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 250, f"Expected Broward price to be 250, got {data['prices'].get('Broward')}"
    
    def test_well_septic_medium_returns_500(self):
        """Well & Septic Co. with category_type=medium should return $500"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Well & Septic Co.",
                "category_type": "medium",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 500, f"Expected Miami-Dade price to be 500, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 500, f"Expected Broward price to be 500, got {data['prices'].get('Broward')}"
    
    def test_well_septic_large_returns_1000(self):
        """Well & Septic Co. with category_type=large should return $1000"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade", "Broward"],
                "category": "Well & Septic Co.",
                "category_type": "large",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["prices"].get("Miami-Dade") == 1000, f"Expected Miami-Dade price to be 1000, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") == 1000, f"Expected Broward price to be 1000, got {data['prices'].get('Broward')}"


class TestCategoriesEndpoint:
    """Tests for GET /api/contracts/categories endpoint"""
    
    def test_categories_returns_4_categories(self):
        """Categories endpoint should return 4 categories with pricing by type"""
        response = requests.get(f"{BASE_URL}/api/contracts/categories")
        assert response.status_code == 200
        data = response.json()
        
        assert "categories" in data
        assert len(data["categories"]) == 4, f"Expected 4 categories, got {len(data['categories'])}"
        
        category_names = [cat["name"] for cat in data["categories"]]
        expected = ["Plumber", "Pest Control Service", "Well & Septic Co.", "Electricians"]
        for name in expected:
            assert name in category_names, f"Expected category '{name}' not found"
    
    def test_each_category_has_3_types(self):
        """Each category should have 3 types: small, medium, large"""
        response = requests.get(f"{BASE_URL}/api/contracts/categories")
        assert response.status_code == 200
        data = response.json()
        
        for cat in data["categories"]:
            types = [t["type"] for t in cat["types"]]
            assert "small" in types, f"Category {cat['name']} missing 'small' type"
            assert "medium" in types, f"Category {cat['name']} missing 'medium' type"
            assert "large" in types, f"Category {cat['name']} missing 'large' type"


class TestCategoryNormalization:
    """Tests for category name normalization (plural/singular handling)"""
    
    def test_plumbers_plural_works(self):
        """'Plumbers' (plural) should match 'Plumber' category"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "Plumbers",  # plural
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        # Should still return price (normalization strips trailing 's')
        assert data["prices"].get("Miami-Dade") == 200, f"Expected 200 for Plumbers, got {data['prices'].get('Miami-Dade')}"
    
    def test_electrician_singular_works(self):
        """'Electrician' (singular) should match 'Electricians' category"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "Electrician",  # singular
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        # Should still return price (normalization handles singular/plural)
        assert data["prices"].get("Miami-Dade") == 220, f"Expected 220 for Electrician, got {data['prices'].get('Miami-Dade')}"


class TestEmptyAndInvalidRequests:
    """Tests for edge cases and invalid requests"""
    
    def test_empty_counties_returns_empty_prices(self):
        """Empty counties list should return empty prices"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": [],
                "category": "Electricians",
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["prices"] == {}, f"Expected empty prices, got {data['prices']}"
    
    def test_invalid_category_returns_null_prices(self):
        """Invalid category should return null prices for counties"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Miami-Dade"],
                "category": "InvalidCategory",
                "category_type": "small",
                "state": "Florida"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["prices"].get("Miami-Dade") is None, f"Expected None for invalid category, got {data['prices'].get('Miami-Dade')}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
