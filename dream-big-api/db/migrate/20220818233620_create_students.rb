class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :name
      t.integer :phone
      t.string :address
      t.string :type
      t.timestamps
    end
  end
end
