class CreateAssignedProjects < ActiveRecord::Migration[7.2]
  def change
    create_table :assigned_projects do |t|
      t.references :employee, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
