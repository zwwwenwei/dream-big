module Entities
    class CategoryEntity < Grape::Entity
      expose :id
      expose :name
      expose :description
      expose :default_weight
     
    end
  end