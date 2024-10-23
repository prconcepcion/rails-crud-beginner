class AssignedProject < ApplicationRecord
  has_and_belongs_to_many :employee
  has_and_belongs_to_many :project
end
