class ChangeJourneyStar < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :journey_stars, :student_journeys, on_delete: :cascade, column: :student_journey_id
  end
end
