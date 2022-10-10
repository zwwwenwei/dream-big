class CreateJourneyStars < ActiveRecord::Migration[7.0]
  def change
    create_table :journey_stars do |t|
      t.boolean :isMaxed
      t.bigint :student_journey_id
      t.timestamps
    end
  end
end
