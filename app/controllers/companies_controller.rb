class CompaniesController < ApplicationController
  def index
    companies = Company.all
    output = Array.new
    companies.each do | company |
        projects = Project.where(company_id: company.id).select("name")
        projects_array = []
        projects.each do | project |
          projects_array.push(project.name)
        end
        output.push({ "id"=> company.id, "name" => company.name, "projects" => projects_array })
    end
    render json: output
  end
end
