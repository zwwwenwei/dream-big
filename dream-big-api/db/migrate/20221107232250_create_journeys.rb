class CreateJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :journeys do |t|
      t.bigint :studentID
      t.bigint :assessmentID
      t.timestamps
    end
  end
end
