# Menu Management System
```Developed By Hanibal Girmay```

## Description

This is a **Menu Management System** designed to streamline the management of menu items for restaurants. The project is developed using a **Turo monorepo** structure, allowing for efficient handling of both the frontend and backend components.

### Technologies Used

- **Frontend**: 
  - **React** with **Tailwind CSS** for styling
  - **Preline** for UI components

- **Backend**: 
  - **NestJS** for building the API
  - **Prisma** as the ORM for database interactions

### Folder Structure
```
menu-management/
├── api/ # NestJS API
│ ├── src/
│ ├── prisma/
│ └── ...
├── web/ # Next.js Application
│ ├── src/
│ ├── components/
│ |── service
| |── types
| └── store
└── ...

```
### Screenshot

![Menu Management Screenshot](screenshoots//Screenshot%202025-02-20%20100957.png)
![Menu Management Screenshot](screenshoots//Screenshot%202025-02-20%20101043.png)
![Menu Management Screenshot](screenshoots//Screenshot%202025-02-20%20103610.png)
![Menu Management Screenshot](screenshoots//Screenshot%202025-02-20%20113040.png)
![Menu Management Screenshot](screenshoots//Screenshot%202025-02-20%20113059.png)

### Cloning and Running the Project

To clone and run the project, please follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://gitlab.com/hanibalgirmay/menu-management.git
   ```
   ```cd menu-management```

Set up environment variables:
Create a .env file in the backend directory and configure your environment variables.

    DATABASE_URL=
    NEXT_PUBLIC_API_URL= (frontend web)

Install dependencies:
Use pnpm to install the dependencies for both frontend and backend:
bash

```
pnpm install
```
Navigate to the backend directory and start the server:
bash

```
cd backend
pnpm dev
```
Run the frontend:
Open a new terminal, navigate to the frontend directory, and start the application:
bash

```
cd frontend
pnpm dev
```