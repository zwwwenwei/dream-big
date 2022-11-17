module Entities
    class AssessmentsEntity < Grape::Entity
      expose :id
      expose :journey_id
      expose :category_id
    end
  end