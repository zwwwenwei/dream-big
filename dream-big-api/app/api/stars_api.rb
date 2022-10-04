require 'grape'

class StarsApi < Grape::API

  desc 'Allow creation of a star'
  params do
    requires :name, type: String, desc: 'Name of the Star Object'
    requires :status, type: String, desc: 'star status'
    requires :star_system_id, type: Integer, desc: 'the id for the star system this star belongs to'
    requires :skin_id, type: Integer, desc: 'ID of the star Skin'
  end
  post '/star' do
    star_parameters = ActionController::Parameters.new(params)
      .permit(
        :name, 
        :status,
        :star_system_id,
        :skin_id

      )

    # Auth...

    result = Star.create!(star_parameters)

    present result, with: Entities::StarsEntity
  end

  desc 'Allow updating of a star'
  params do
    optional :name, type: String, desc: 'Name of the Star Object'
    optional :status, type: String, desc: 'star status'
    requires :star_system_id, type: Integer, desc: 'the id for the star system this star belongs to'
    optional :skin_id, type: Integer, desc: 'ID of the star Skin'
  end
  put '/star/:id' do
    star_parameters = ActionController::Parameters.new(params)
      .permit(
        :name, 
        :status,
        :star_system_id,
        :skin_id
      )

    # Auth

    result = Star.find(params[:id])
    result.update! star_parameters

    present result, with: Entities::StarsEntity
  end

  desc 'Delete the star with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the star to delete'
  end
  delete '/star/:id' do
    Star.find(params[:id]).destroy!
    true
  end

  desc 'Get all stars with the indicated star_system_id'
  params do
    requires :star_system_id, type: Integer, desc: 'The id of the star_system'
  end
  get '/star' do
    result = Star.where(star_system_id: params[:star_system_id])


    present result, with: Entities::StarsEntity
  end
end