module Entities
    class CategoryEntity < Grape::Entity
      expose :id
      expose :name
      expose :description
      expose :weight
     
    end
  end