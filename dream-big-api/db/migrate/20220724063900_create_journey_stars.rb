class CreateJourneyStars < ActiveRecord::Migration[7.0]
  def change
    create_table :journey_stars do |t|
      t.bigint :category_id
      t.boolean :isMaxed
      t.bigint :student_journey_id
    end
  end
end
