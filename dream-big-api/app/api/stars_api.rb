require 'grape'

class StarsApi < Grape::API

  desc 'Allow creation of a star'
  params do
    requires :status, type: String, desc: 'Status: Active/Inactive'
    requires :name, type: String, desc: 'Name of star object'
    requires :goals, type: String, desc: 'The input goals for this star'
    requires :reflection, type: String, desc: 'The input reflection for this star'
    requires :star_system_id, type:Integer, desc: 'ID of parent star system'
  end
  post '/star' do
    star_parameters = ActionController::Parameters.new(params)
      .permit(
        :status,
        :name, 
        :goals,
        :reflection,
        :star_system_id,
      )

    # Auth...

    result = Star.create!(star_parameters)

    present result, with: Entities::StarsEntity
  end

  desc 'Allow updating of a star'
  params do
    requires :id, type:Integer, desc: 'ID of star object'

    optional :status, type: String, desc: 'Status: Active/Inactive'
    optional :name, type: String, desc: 'Name of star object'
    optional :goals, type: String, desc: 'The input goals for this star'
    optional :reflection, type: String, desc: 'The input reflection for this star'
  end
  put '/star/:id' do
    star_parameters = ActionController::Parameters.new(params)
      .permit(
        :status,
        :name, 
        :goals,
        :reflection
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
end