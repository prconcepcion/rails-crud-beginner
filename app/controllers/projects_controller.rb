class ProjectsController < ApplicationController
  def index
    projects = Project.all()
    output = Array.new
    projects.each do | project |
      assigned_projects = AssignedProject.where(project_id: project.id)
      employees_array = Array.new
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
