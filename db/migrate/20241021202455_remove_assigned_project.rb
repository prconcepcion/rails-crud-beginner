class RemoveAssignedProject < ActiveRecord::Migration[7.2]
  def change
    drop_table :assigned_projects
    create_table :assigned_projects do |t|s
      t.belongs_to :project
      t.belongs_to :employee
    end
  end
end
