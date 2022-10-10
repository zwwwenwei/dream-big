module Entities
    class JourneyStarEntity < Grape::Entity
      expose :id
      expose :category_id
      expose :isMaxed
    end
  end