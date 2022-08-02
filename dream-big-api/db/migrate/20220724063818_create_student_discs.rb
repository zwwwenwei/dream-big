class CreateStudentDiscs < ActiveRecord::Migration[7.0]
  def change
    create_table :student_discs do |t|

      t.timestamps
    end
  end
end
