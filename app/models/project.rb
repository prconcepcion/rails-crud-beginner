class Project < ApplicationRecord
    has_and_belongs_to_many :assigned_projects
    belongs_to :company
end
