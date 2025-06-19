# smileCart

SmileCart is a fully functional e-commerce web application where users can browse products, search, add items to cart, and proceed to checkout.


![image](https://github.com/user-attachments/assets/06e87a41-3162-4040-9d69-584b687ffe94)


## 🚀 Live Demo
You can check out the live version here:  
🔗 **[smileCart App](https://smile-cart-react.vercel.app/products)**

## Features

### Phase 1
- Display a list of products in a responsive grid layout.

- Implement a search bar to filter products.

- Add products to the shopping cart.

- View cart items with quantity, price, and total.

- Store cart state using Zustand for global state management.

- Use React Query to fetch and cache product data.

- Show loading and error states for API requests.

- Deploy the application using Vercel.

## Tech Stack
- React.js

- Tailwind CSS

- Zustand (State Management)

- React Query

- Axios

- React Router DOM

## Getting Started

### Prerequisites
- Node.js and npm/yarn installed

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/smile-cart-react.git
   cd smile-cart-react
   ```
2. Install dependencies:
   ```sh
   yarn install  # or npm install
   ```

3. Start the development server:
   ```sh
   yarn start  # or npm start
   ```

## Usage
- Browse through a list of available products.

- Search for specific items using the search bar.

- Add products to your cart and view them in a cart page.

- Increase/decrease product quantities or remove them from the cart.

- Prepare for checkout (in upcoming features).

## Deployment
To deploy the application using Vercel:
```sh
vercel deploy
```

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-name`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## Backend APIs
🔗 **[ Backend URL](https://smile-cart-backend-staging.neetodeployapp.com)**

## Endpoints
- GET /products – List products (supports search_term, page, page_size)
- Example: /products?search_term=shirt&page=1&page_size=10

- GET /products/:slug – Get product details
- Example: /products/infinix-inbook-2

- POST /orders – Place an order (dummy endpoint, returns success only)

- GET /countries – List all countries (name + code)

- GET /states?country_code=XX – Get states for a country
- Example: /states?country_code=IN

## License
This project is licensed under the MIT License.

## Acknowledgments
Special thanks to BigBinary Academy for providing the learning resources and guidance for this project.

---

Feel free to modify and enhance this README as needed!


