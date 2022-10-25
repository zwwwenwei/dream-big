module Entities
  class StudentJourneyEntity < Grape::Entity
    expose :id
    expose :timeline
    expose :student_id
    expose :star_systems
  end
end
