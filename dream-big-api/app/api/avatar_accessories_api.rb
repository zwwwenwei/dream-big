require 'grape'

class AvatarAccessoriesApi < Grape::API
  desc 'Allow retrieval of a users avatar-accessories'
  get '/avatar-accessories/:id' do
    avatar_accessories_parameters = ActionController::Parameters.new(params)
      .permit(
        :id
      )

    # Auth

    result = AvatarAccessories.find(params[:id])
    present result, with: Entities::AvatarAccessoriesEntity
  end

  desc 'Allow creation of an Avatar Accessory'
  params do
  
    requires :imgpath, type: String, desc: 'Link to Accesory image for avatar-accessories'

  end
  post '/avatar-accessories' do
    avatar_accessories_parameters = ActionController::Parameters.new(params)
      .permit(
        :imgpath
      )

    # Auth...

    result = AvatarAccessories.create!(avatar_parameters)

    present result, with: Entities::AvatarAccessoriesEntity
  end

  desc 'Allow updating of a Avatar accessories'
  params do
    
    optional :imgpath, type: String, desc: 'Link to Accesory image for avatar-accessories'

  end

  put '/avatar-accessories/:id' do
    avatar_accessories_parameters = ActionController::Parameters.new(params)
      .permit(
        :imgpath
      )

    # Auth

    result = AvatarAccessories.find(params[:id])
    result.update! avatar_accessories_parameters

    present result, with: Entities::AvatarAccessoriesEntity
  end

  desc 'Delete the Avatar with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the avatar-accessories to delete'
  end
  delete '/avatar-accessories/:id' do
    AvatarAccessories.find(params[:id]).destroy!
    true
  end

  get '/avatar-accessories' do
    result = AvatarAccessories.all

    present result, with: Entities::AvatarAccessoriesEntity
  end
end