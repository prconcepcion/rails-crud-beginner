class AddForeignKeys < ActiveRecord::Migration[7.2]
  def change
    add_reference :projects, :company, null: false, foreign_key: true
  end
end
