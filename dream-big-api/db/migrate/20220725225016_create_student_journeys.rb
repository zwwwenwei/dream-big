class CreateStudentJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :student_journeys do |t|
      t.float :timeline
      t.bigint :student_id
      t.timestamps
    end
    add_foreign_key :student_journeys, :students, on_delete: :cascade, column: :student_id
  end
end
