import requests
import sys
import json
from datetime import datetime

class AutoCommerceAPITester:
    def __init__(self, base_url="https://auto-commerce-8.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_vehicle_id = None
        self.created_user_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else f"{self.api_url}/"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and len(str(response_data)) < 500:
                        print(f"   Response: {response_data}")
                    elif isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}...")

            return success, response.json() if response.text and response.status_code < 500 else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test("Root API Endpoint", "GET", "", 200)

    def test_create_vehicle(self):
        """Test creating a new vehicle"""
        vehicle_data = {
            "title": "Test Vehicle - BMW X5 2023",
            "brand": "BMW",
            "model": "X5",
            "year": 2023,
            "price": 450000.00,
            "mileage": 5000,
            "vehicle_type": "suv",
            "fuel_type": "gasoline",
            "transmission": "automatic",
            "condition": "used",
            "color": "Preto",
            "description": "BMW X5 em excelente estado, revisado em concessionária",
            "location": "São Paulo, SP",
            "seller_name": "João Silva",
            "seller_phone": "(11) 99999-9999",
            "seller_email": "joao@email.com",
            "images": ["https://example.com/bmw1.jpg", "https://example.com/bmw2.jpg"],
            "features": ["GPS", "Couro", "Teto Solar", "Câmera de Ré"]
        }
        
        success, response = self.run_test("Create Vehicle", "POST", "vehicles", 201, vehicle_data)
        if success and 'id' in response:
            self.created_vehicle_id = response['id']
            print(f"   Created vehicle ID: {self.created_vehicle_id}")
        return success

    def test_get_vehicles(self):
        """Test getting all vehicles"""
        return self.run_test("Get All Vehicles", "GET", "vehicles", 200)

    def test_get_vehicles_with_filters(self):
        """Test getting vehicles with filters"""
        params = {
            "brand": "BMW",
            "min_price": 400000,
            "max_price": 500000,
            "limit": 5
        }
        return self.run_test("Get Vehicles with Filters", "GET", "vehicles", 200, params=params)

    def test_get_featured_vehicles(self):
        """Test getting featured vehicles"""
        return self.run_test("Get Featured Vehicles", "GET", "vehicles/featured", 200)

    def test_get_vehicle_by_id(self):
        """Test getting a specific vehicle by ID"""
        if not self.created_vehicle_id:
            print("⚠️  Skipping - No vehicle ID available")
            return True
        
        return self.run_test("Get Vehicle by ID", "GET", f"vehicles/{self.created_vehicle_id}", 200)

    def test_update_vehicle(self):
        """Test updating a vehicle"""
        if not self.created_vehicle_id:
            print("⚠️  Skipping - No vehicle ID available")
            return True
            
        update_data = {
            "price": 425000.00,
            "description": "BMW X5 em excelente estado - PREÇO ATUALIZADO!",
            "is_featured": True
        }
        
        return self.run_test("Update Vehicle", "PUT", f"vehicles/{self.created_vehicle_id}", 200, update_data)

    def test_create_user(self):
        """Test creating a new user"""
        user_data = {
            "name": "Maria Santos",
            "email": f"maria.test.{datetime.now().strftime('%H%M%S')}@email.com",
            "phone": "(11) 88888-8888",
            "location": "Rio de Janeiro, RJ"
        }
        
        success, response = self.run_test("Create User", "POST", "users", 201, user_data)
        if success and 'id' in response:
            self.created_user_id = response['id']
            print(f"   Created user ID: {self.created_user_id}")
        return success

    def test_get_user(self):
        """Test getting a user by ID"""
        if not self.created_user_id:
            print("⚠️  Skipping - No user ID available")
            return True
            
        return self.run_test("Get User by ID", "GET", f"users/{self.created_user_id}", 200)

    def test_add_to_favorites(self):
        """Test adding vehicle to user favorites"""
        if not self.created_user_id or not self.created_vehicle_id:
            print("⚠️  Skipping - Missing user or vehicle ID")
            return True
            
        return self.run_test("Add to Favorites", "POST", f"users/{self.created_user_id}/favorites/{self.created_vehicle_id}", 200)

    def test_get_user_favorites(self):
        """Test getting user favorites"""
        if not self.created_user_id:
            print("⚠️  Skipping - No user ID available")
            return True
            
        return self.run_test("Get User Favorites", "GET", f"users/{self.created_user_id}/favorites", 200)

    def test_remove_from_favorites(self):
        """Test removing vehicle from user favorites"""
        if not self.created_user_id or not self.created_vehicle_id:
            print("⚠️  Skipping - Missing user or vehicle ID")
            return True
            
        return self.run_test("Remove from Favorites", "DELETE", f"users/{self.created_user_id}/favorites/{self.created_vehicle_id}", 200)

    def test_get_stats(self):
        """Test getting marketplace statistics"""
        return self.run_test("Get Statistics", "GET", "stats", 200)

    def test_vehicle_search(self):
        """Test vehicle search functionality"""
        params = {"search": "BMW"}
        return self.run_test("Search Vehicles", "GET", "vehicles", 200, params=params)

    def test_invalid_endpoints(self):
        """Test invalid endpoints return proper errors"""
        print(f"\n🔍 Testing Invalid Endpoints...")
        
        # Test non-existent vehicle
        success1, _ = self.run_test("Get Non-existent Vehicle", "GET", "vehicles/invalid-id", 404)
        
        # Test non-existent user  
        success2, _ = self.run_test("Get Non-existent User", "GET", "users/invalid-id", 404)
        
        return success1 and success2

    def cleanup(self):
        """Clean up created test data"""
        print(f"\n🧹 Cleaning up test data...")
        
        if self.created_vehicle_id:
            success, _ = self.run_test("Delete Test Vehicle", "DELETE", f"vehicles/{self.created_vehicle_id}", 200)
            if success:
                print("   ✅ Test vehicle deleted")

def main():
    print("🚗 AutoCommerce API Testing Suite")
    print("=" * 50)
    
    tester = AutoCommerceAPITester()
    
    # Run all tests in sequence
    test_methods = [
        tester.test_root_endpoint,
        tester.test_create_vehicle,
        tester.test_get_vehicles,
        tester.test_get_vehicles_with_filters,
        tester.test_get_featured_vehicles,
        tester.test_get_vehicle_by_id,
        tester.test_update_vehicle,
        tester.test_create_user,
        tester.test_get_user,
        tester.test_add_to_favorites,
        tester.test_get_user_favorites,
        tester.test_remove_from_favorites,
        tester.test_get_stats,
        tester.test_vehicle_search,
        tester.test_invalid_endpoints
    ]
    
    print(f"\nRunning {len(test_methods)} test suites...")
    
    for test_method in test_methods:
        try:
            test_method()
        except Exception as e:
            print(f"❌ Test suite failed with error: {str(e)}")
            tester.tests_run += 1
    
    # Cleanup
    tester.cleanup()
    
    # Print final results
    print(f"\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed - check logs above")
        return 1

if __name__ == "__main__":
    sys.exit(main())