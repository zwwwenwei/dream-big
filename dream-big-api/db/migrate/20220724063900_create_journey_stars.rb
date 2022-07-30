class CreateJourneyStars < ActiveRecord::Migration[7.0]
  def change
    create_table :journey_stars do |t|

      t.timestamps
    end
  end
end
