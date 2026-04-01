"""
Test Territory Pricing API
Tests the POST /api/contracts/territory-pricing endpoint that fetches prices from Supabase territory_pricings table.
Test data in Supabase: Jackson/Electrician=$500, Union/Plumber=$255, Alachua/Mechanic=$12000
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestTerritoryPricingAPI:
    """Tests for territory pricing endpoint"""
    
    def test_jackson_electricians_returns_500(self):
        """Jackson county + Electricians category should return $500"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Jackson"],
                "category": "Electricians",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "prices" in data, "Response should contain 'prices' key"
        assert data["prices"].get("Jackson") == 500, f"Expected Jackson price to be 500, got {data['prices'].get('Jackson')}"
    
    def test_union_plumbers_returns_255(self):
        """Union county + Plumbers category should return $255"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Union"],
                "category": "Plumbers",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "prices" in data, "Response should contain 'prices' key"
        assert data["prices"].get("Union") == 255, f"Expected Union price to be 255, got {data['prices'].get('Union')}"
    
    def test_alachua_mechanic_returns_12000(self):
        """Alachua county + Mechanic category should return $12000"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Alachua"],
                "category": "Mechanic",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "prices" in data, "Response should contain 'prices' key"
        assert data["prices"].get("Alachua") == 12000, f"Expected Alachua price to be 12000, got {data['prices'].get('Alachua')}"
    
    def test_county_without_pricing_returns_null(self):
        """Counties without pricing in the table should return null"""
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
        assert "prices" in data, "Response should contain 'prices' key"
        # Should return None/null for counties not in the pricing table
        assert data["prices"].get("Miami-Dade") is None, f"Expected Miami-Dade price to be None, got {data['prices'].get('Miami-Dade')}"
    
    def test_multiple_counties_mixed_pricing(self):
        """Test multiple counties - some with pricing, some without"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Jackson", "Miami-Dade", "Broward"],
                "category": "Electricians",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "prices" in data, "Response should contain 'prices' key"
        # Jackson should have price, others should be null
        assert data["prices"].get("Jackson") == 500, f"Expected Jackson price to be 500, got {data['prices'].get('Jackson')}"
        assert data["prices"].get("Miami-Dade") is None, f"Expected Miami-Dade price to be None, got {data['prices'].get('Miami-Dade')}"
        assert data["prices"].get("Broward") is None, f"Expected Broward price to be None, got {data['prices'].get('Broward')}"
    
    def test_empty_counties_returns_empty_prices(self):
        """Empty counties list should return empty prices"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": [],
                "category": "Electricians",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data["prices"] == {}, f"Expected empty prices dict, got {data['prices']}"
    
    def test_empty_category_returns_empty_prices(self):
        """Empty category should return empty prices"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Jackson"],
                "category": "",
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data["prices"] == {}, f"Expected empty prices dict, got {data['prices']}"
    
    def test_case_insensitive_category_matching(self):
        """Category matching should be case-insensitive"""
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Jackson"],
                "category": "electricians",  # lowercase
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data["prices"].get("Jackson") == 500, f"Expected Jackson price to be 500 with lowercase category, got {data['prices'].get('Jackson')}"
    
    def test_plural_category_matching(self):
        """Category matching should handle plural forms (Electricians -> Electrician)"""
        # Test with singular form
        response = requests.post(
            f"{BASE_URL}/api/contracts/territory-pricing",
            json={
                "counties": ["Jackson"],
                "category": "Electrician",  # singular
                "state": "Florida"
            }
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # Should still match since backend strips trailing 's'
        assert data["prices"].get("Jackson") == 500, f"Expected Jackson price to be 500 with singular category, got {data['prices'].get('Jackson')}"


class TestHealthCheck:
    """Basic health check tests"""
    
    def test_api_is_accessible(self):
        """Verify API is accessible"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200, f"Health check failed with status {response.status_code}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
