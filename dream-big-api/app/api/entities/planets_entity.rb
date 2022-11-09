module Entities
    class PlanetsEntity < Grape::Entity
      expose :id
      expose :name
      expose :journeyID
    end
  end