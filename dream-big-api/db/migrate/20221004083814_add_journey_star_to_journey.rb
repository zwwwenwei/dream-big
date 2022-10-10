class AddJourneyStarToJourney < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :student_journeys, :journey_stars, ondelete: :cascade, column: :journey_stars_id
  end
end
