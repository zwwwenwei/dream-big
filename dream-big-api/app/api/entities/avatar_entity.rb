module Entities
    class AvatarEntity < Grape::Entity
      expose :id
      expose :avatar_head_id
      expose :avatar_torsos_id
      expose :avatar_hairs_id
      expose :avatar_accessories_id
    end
  end
  