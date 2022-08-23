class UpdateStudents < ActiveRecord::Migration[7.0]
    def change
        add_reference :students, :users, type: :bigint, index: false
    end
  end