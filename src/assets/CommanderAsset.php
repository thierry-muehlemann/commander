<?php

namespace thierrysh\craftcommander\assets;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class CommanderAsset extends AssetBundle
{
  public function init(): void
  {
    $this->sourcePath = __DIR__ . '/dist';

    // Depend on CpAsset so it loads after Craft's CP assets
    $this->depends = [
      CpAsset::class,
    ];

    $this->js = [
      'main.js',
    ];

    $this->jsOptions = [
      'type' => 'module',
    ];

    $this->css = [
      'main.css',
    ];

    parent::init();
  }
}
