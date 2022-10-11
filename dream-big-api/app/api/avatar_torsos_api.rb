require 'grape'

class AvatarTorsosApi < Grape::API
  desc 'Allow retrieval of a users avatar-torsos'
  get '/avatar-torsos/:id' do
    avatar_torsos_parameters = ActionController::Parameters.new(params)
      .permit(
        :id
      )

    # Auth

    result = AvatarTorsos.find(params[:id])
    present result, with: Entities::AvatarTorsosEntity
  end

  desc 'Allow creation of an Avatar Torsos'
  params do
  
    requires :imgpath, type: String, desc: 'Link to Accesory image for avatar-Torsos'

  end
  post '/avatar-torsos' do
    avatar_torsos_parameters = ActionController::Parameters.new(params)
      .permit(
        :imgpath
      )

    # Auth...

    result = AvatarTorsos.create!(avatar_parameters)

    present result, with: Entities::AvatarTorsosEntity
  end

  desc 'Allow updating of a Avatar Torsos'
  params do
    
    optional :imgpath, type: String, desc: 'Link to Accesory image for avatar-Torsos'

  end

  put '/avatar-torsos/:id' do
    avatar_torsos_parameters = ActionController::Parameters.new(params)
      .permit(
        :imgpath
      )

    # Auth

    result = AvatarTorsos.find(params[:id])
    result.update! avatar_torsos_parameters

    present result, with: Entities::AvatarTorsosEntity
  end

  desc 'Delete the Avatar Torsos with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the avatar-Torsos to delete'
  end
  delete '/avatar-torsos/:id' do
    AvatarTorsos.find(params[:id]).destroy!
    true
  end

  get '/avatar-torsos' do
    result = AvatarTorsos.all

    present result, with: Entities::AvatarTorsosEntity
  end
end