class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :name
      t.integer :phone
      t.string :address
      t.string :student_type
      t.timestamps
      t.bigint :user_id
    end
    add_foreign_key :students, :users, ondelete: :cascade, column: :user_id
  end
end
