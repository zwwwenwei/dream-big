module Entities
    class PlanetSkinEntity < Grape::Entity
      expose :id
      expose :name
      expose :asset
      expose :color
    end
  end