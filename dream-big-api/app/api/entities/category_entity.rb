module Entities
  class CategoryEntity < Grape::Entity
    expose :id
    expose :name
    expose :description
    expose :weight_value_id
  end
end
