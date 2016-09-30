defmodule PhoenixTrello.Card do
  use PhoenixTrello.Web, :model

  alias PhoenixTrello.{Repo, List, Card}

  @derive {Poison.Encoder, only: [:id, :list_id, :name]}

  schema "cards" do
    field :name, :string
    belongs_to :list, List

    timestamps()
  end

  @required_fields ~w(name list_id)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
