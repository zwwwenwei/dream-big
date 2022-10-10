class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :firstName
      t.string :lastName
      t.integer :phone
      t.string :address
      t.string :student_type
      t.bigint :user_id
      t.bigint :avatar_id
    end
    add_foreign_key :students, :users, ondelete: :cascade, column: :user_id
    add_foreign_key :students, :avatars, ondelete: :cascade, column: :avatar_id
  end
end