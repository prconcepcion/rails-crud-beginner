import { createBrowserRouter,  } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EmployeesPage } from './pages/EmployeesPage'
import { CompanyPage } from './pages/CompanyPage'
import { CompaniesPage } from './pages/CompaniesPage'
import { ProjectPage } from './pages/ProjectPage'
import { NavBar } from './components/NavBar'

export const router = createBrowserRouter([
    {
      path:'/',
      element: <NavBar />,
      children: [
        {
          path: '/home',
          element: <HomePage />
        },
        {
          path: '/employees',
          element: <EmployeesPage />
        },
        {
          path: '/companies',
          element: <CompaniesPage />
        },
        {
          path: '/companies/:companyId',
          element: <CompanyPage />
        },
        {
          path: 'project/:projectId',
          element: <ProjectPage />
        }
      ]
    },
])
  