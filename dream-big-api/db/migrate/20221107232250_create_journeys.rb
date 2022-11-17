class CreateJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :journeys do |t|
      t.bigint :student_id
      t.timestamps
    end
  end
end
