# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

employees = []
[ "Pio", "John", "Jason" ].each do | name |
  employee = Employee.create(name: name)
  employees.push(employee)
end
company = Company.create(name: 'Deya')
company2 = Company.create(name: 'Yoda')


projects = []
[ "Easy Ruby Project", "Hard Ruby Project", "Terrible Ruby Project" ].each do | name |
    company_id = rand(1..2) == 2 ? company.id : company2.id
    project = Project.create(name: name, company_id: company_id)
    projects.push(project)
end

puts projects

employees.each_with_index do | employee, index |
  AssignedProject.create(employee_id: employee.id, project_id: projects[index].id)
end
AssignedProject.create(employee_id: employees[0].id, project_id: projects[2].id)
