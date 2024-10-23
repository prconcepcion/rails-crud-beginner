class EmployeesController < ApplicationController
  def index
    employees = Employee.all
    output = Array.new
    employees.each do | employee |
      output.push({ "id"=>employee.id, "name"=>employee.name })
    end
    render json: output
  end

  def create
    employee_params = params.require(:employee).permit(:name)
    @employee = Employee.new(employee_params)
    if @employee.save
      render json: @employee, status: :created
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @employee = Employee.find(params[:id])
    @employee.delete
    render json: { msg: "Employee sucessfully deleted" }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Employee not found" }, status: :not_found
  end

  def update
    puts params
    employee_params = params.require(:employee).permit(:name)
    @employee = Employee.find(params[:id])
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end
end
