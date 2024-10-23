class Employee < ApplicationRecord
    has_and_belongs_to_many :assigned_projects
end
