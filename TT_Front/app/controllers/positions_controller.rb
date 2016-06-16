class PositionsController < ApplicationController
	require 'net/http'

	def index
		@positions = Position.All()
	end

	def new

	end

	def show

	end

	def update

	end

	def create
		if not params[:position]["pps"].nil?
			params[:position]["qty"] = params[:position][:value].to_f / params[:position]["pps"].to_f
		end
		Position.Post(params[:position])
	end

	def edit

	end

	def destroy
		Position.Delete(params[:id])
	end
end
