class CreateJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :journeys do |t|
      t.bigint :student_ID
      t.bigint :assessment_ID
      t.bigint :student_ID
      t.timestamps
    end
  end
end
