class ApiController < ApplicationController
  def companies
    companies = Company.all
    output = Array.new
    companies.each do | company |
        projects = Project.where(company_id: company.id).select("name")
        projects_array = []
        projects.each do | project |
          projects_array.push(project.name)
        end
        output.push({ "name" => company.name, "projects" => projects_array })
    end
    render json: output
  end

  def projects
    projects = Project.all()
    output = Array.new
    projects.each do | project |
      assigned_projects = AssignedProject.where(project_id: project.id)
      employees_array = Array.new
      test = Array.new


      assigned_projects.each do | assigned_project |
        employee_id = assigned_project.employee_id
        employee = Employee.find(employee_id)
        employees_array.push(employee.name)
      end

      output.push({ "name" => project.name, "employees" => employees_array })
    end
    render json: output
  end
end
