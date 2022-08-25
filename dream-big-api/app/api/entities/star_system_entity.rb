module Entities
  class StarSystemEntity < Grape::Entity
    expose :id
    expose :status
    expose :name
    expose :student_journey_id
  end
end
