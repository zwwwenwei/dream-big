class CreateStudentJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :student_journeys do |t|

      t.timestamps
    end
  end
end
