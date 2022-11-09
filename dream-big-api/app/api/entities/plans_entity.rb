module Entities
    class PlansEntity < Grape::Entity
      expose :id
      expose :planText
      expose :sectionID
      expose :goalID
    end
  end