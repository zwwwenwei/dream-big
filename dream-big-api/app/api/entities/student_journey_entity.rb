module Entities
  class StudentJourneyEntity < Grape::Entity
    expose :id
    expose :timeline
    expose :student_id
    expose :journey_star_id
  end
end
