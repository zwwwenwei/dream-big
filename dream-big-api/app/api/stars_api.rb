require 'grape'

class StarApi < Grape::API

  desc 'Allow creation of a star'
  params do
  
    requires :status, type: String, desc: 'starstatus'
  end
  post '/star' do
    star_parameters = ActionController::Parameters.new(params)
      .permit(
        :status
      )

    # Auth...

    result = Star.create!(star_parameters)

    present result, with: Entities::StarsEntity
  end

  desc 'Allow updating of a star'
  params do
    
    optional :status, type: String, desc: 'star Status'
  end
  put '/star/:id' do
    star_parameters = ActionController::Parameters.new(params)
      .permit(
        :status
        #Ex:- :default =>''
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

  get '/star' do
    result = Star.all

    present result, with: Entities::StarsEntity
  end
end