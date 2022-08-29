module Entities
    class StarSkinEntity < Grape::Entity
      expose :id
      expose :asset
      expose :color
      expose :name
    end
  end